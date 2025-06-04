package com.tyk.springev2.results.ticker;

public enum TickerResult {
    FAILURE,                // 정규화 실패
    FAILURE_DUPLICATE_ID,   // ID 중복
    SUCCESS                 // 성공
}
