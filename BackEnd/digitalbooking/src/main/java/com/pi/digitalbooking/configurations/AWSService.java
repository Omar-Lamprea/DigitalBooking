package com.pi.digitalbooking.configurations;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import java.io.File;
import java.sql.Date;

public class AWSService {
    private static AWSService instance;
    private AmazonS3 s3client;

    public String bucketName = "dh-g8-test";

    private AWSService() {
        AWSCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(new ProfileCredentialsProvider().getCredentials());
        this.s3client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.US_EAST_1)
                .withCredentials(credentialsProvider)
                .build();
    }

    public static synchronized AWSService getInstance() {
        if (instance == null) {
            instance = new AWSService();
        }
        return instance;
    }

    public void uploadFile(String bucketName, String key, File file) {
        s3client.putObject(bucketName, key, file);
    }

    public String generatePresignedUrl(String bucketName, String key, long expirationTimeMillis) {
        long millis = System.currentTimeMillis();
        String s3Url = s3client.generatePresignedUrl(bucketName, key, new Date(millis + expirationTimeMillis)).toString();
        return s3Url.substring(0, s3Url.indexOf("?"));
    }
}