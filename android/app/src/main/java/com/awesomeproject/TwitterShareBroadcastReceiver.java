package com.awesomeproject;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.twitter.sdk.android.tweetcomposer.TweetUploadService;

public class TwitterShareBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.e("ShareActivity", "onReceive: " + intent.getAction());
//        Log.e("ShareActivity", "receive:"+intent.getAction());
        if (TweetUploadService.UPLOAD_SUCCESS.equals(intent.getAction())) {
            // success Twitter分享成功的回调
            final Long tweetId = intent.getExtras().getLong(TweetUploadService.EXTRA_TWEET_ID);
        } else {
            // failure
            final Intent retryIntent = intent.getExtras().getParcelable(TweetUploadService.EXTRA_RETRY_INTENT);
        }
    }
}
