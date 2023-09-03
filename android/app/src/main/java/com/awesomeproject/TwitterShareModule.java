// TwitterShareModule.java
package com.awesomeproject;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentFilter;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.twitter.sdk.android.core.Callback;
import com.twitter.sdk.android.core.Result;
import com.twitter.sdk.android.core.Twitter;
import com.twitter.sdk.android.core.TwitterAuthConfig;
import com.twitter.sdk.android.core.TwitterConfig;
import com.twitter.sdk.android.core.TwitterCore;
import com.twitter.sdk.android.core.TwitterException;
import com.twitter.sdk.android.core.TwitterSession;
import com.twitter.sdk.android.tweetcomposer.ComposerActivity;
import com.twitter.sdk.android.tweetcomposer.TweetComposer;
import com.twitter.sdk.android.tweetcomposer.TweetUploadService;
import com.twitter.sdk.android.core.identity.TwitterAuthClient;

public class TwitterShareModule extends ReactContextBaseJavaModule {
    private static final int TWITTER_SHARE_REQUEST_CODE = 10001;
    private Promise sharePromise;
    private TwitterAuthClient authClient;

    public TwitterShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);

        //TODO： 初始化Twitter
        TwitterAuthConfig authConfig =  new TwitterAuthConfig(
                "mHNUbtOqTxRoSnICDyoT03EsJ",
                "q0yyCL1MzLG2piHKlWbOC5wwKHZXRjZ0qXicVoZBKXCWFSYacY");
        TwitterConfig twitterConfig = new TwitterConfig.Builder(getReactApplicationContext())
                .twitterAuthConfig(authConfig)
                .build();
        Twitter.initialize(twitterConfig);
    }

    @Override
    public String getName() {
        return "TwitterShare";
    }

    @ReactMethod
    public void shareToTwitter(String text, String url) {

        String tweetText = text + "\n" + url;

//        final TwitterSession session = TwitterCore.getInstance().getSessionManager()
//                .getActiveSession();
//        final Intent intent = new ComposerActivity.Builder(getCurrentActivity())
//                .session(session)
//                .text(tweetText)
//                .hashtags("#twitter")
//                .createIntent();
//        getCurrentActivity().startActivity(intent);
//
        if (TwitterCore.getInstance().getSessionManager().getActiveSession() != null) {
            String authToken = TwitterCore.getInstance().getSessionManager().getActiveSession().getAuthToken().token;
            String authTokenSecret = TwitterCore.getInstance().getSessionManager().getActiveSession().getAuthToken().secret;
            if (!TextUtils.isEmpty(authToken) && !TextUtils.isEmpty(authTokenSecret)) {
                // Twitter已经授权
                Log.e("ShareActivity", "shareToTwitter: 授权" );
            } else {
                // Twitter未授权
                Log.e("ShareActivity", "shareToTwitter: 没有授权" );
            }
        } else {
            // Twitter未授权
            Log.e("ShareActivity", "shareToTwitter getActiveSession null: 没有授权" );
        }

        TweetComposer.Builder builder = new TweetComposer.Builder(getCurrentActivity())
                .text(tweetText);
        builder.show();
//        TwitterSession session = TwitterCore.getInstance().getSessionManager()
//                .getActiveSession();
//        if (session != null) {
//            // 如果用户已经登录Twitter，则直接分享推文
//            shareTweet(session, tweetText);
//        } else {
//            // 如果用户没有登录Twitter，则先登录再分享推文
//            loginToTwitter(tweetText);
//        }

        // 注册Twitter分享的广播接收器
        registerTwitterShareReceiver();
    }

    private void shareTweet(TwitterSession session, String tweetText) {
        Intent intent = new ComposerActivity.Builder(getCurrentActivity())
                .session(session)
                .text(tweetText)
                .hashtags("#twitter")
                .createIntent();
        getCurrentActivity().startActivityForResult(intent, TWITTER_SHARE_REQUEST_CODE);
    }

    private void loginToTwitter(final String tweetText) {
        authClient.authorize(getCurrentActivity(), new Callback<TwitterSession>() {
            @Override
            public void success(Result<TwitterSession> result) {
                TwitterSession session = result.data;
                shareTweet(session, tweetText);
            }

            @Override
            public void failure(TwitterException exception) {
                Log.e("TwitterShareModule", "Twitter登录失败", exception);
                sendTwitterShareEvent("ERROR");
            }
        });
    }

    private void registerTwitterShareReceiver() {
        IntentFilter filter = new IntentFilter();
        filter.addAction(TweetUploadService.UPLOAD_SUCCESS);
        filter.addAction(TweetUploadService.UPLOAD_FAILURE);
        getReactApplicationContext().registerReceiver(new TwitterShareBroadcastReceiver(), filter);
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == TWITTER_SHARE_REQUEST_CODE) {
                if (resultCode == Activity.RESULT_OK) {
                    // Twitter分享成功
                    sendTwitterShareEvent("SUCCESS");
                } else if (resultCode == Activity.RESULT_CANCELED) {
                    // 用户取消了Twitter分享
                    sendTwitterShareEvent("CANCEL");
                } else {
                    // Twitter分享失败
                    sendTwitterShareEvent("ERROR");
                }
            }
        }
    };

    private void sendTwitterShareEvent(String status) {
        ReactApplicationContext reactContext = getReactApplicationContext();
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("TwitterShareEvent", status);
    }
}
