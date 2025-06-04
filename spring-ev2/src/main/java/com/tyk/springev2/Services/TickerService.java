package com.tyk.springev2.Services;

import com.tyk.springev2.entities.TickerEntity;
import com.tyk.springev2.mappers.TickerMapper;
import com.tyk.springev2.results.ticker.TickerResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TickerService {
    private final TickerMapper tickerMapper;

    @Autowired
    public TickerService(TickerMapper tickerMapper) {
        this.tickerMapper = tickerMapper;
    }

    public TickerResult addTicker(TickerEntity ticker) {
        if (ticker.getId() == null ||
                ticker.getName() == null ||
                !ticker.getId().matches("^([A-Z]{1,5})$") ||
                !ticker.getName().matches("^([\\da-zA-Z\\-,.\\s]{1,100})$") ||
                ticker.getId().isEmpty() ||
                ticker.getName().isEmpty() ||
                ticker.getId().length() > 5 ||
                ticker.getName().length() > 100) {
            return TickerResult.FAILURE;
        }

        TickerEntity dbTicker = this.tickerMapper.selectById(ticker.getId());
        if (dbTicker != null) {
            return TickerResult.FAILURE_DUPLICATE_ID;
        }

        return this.tickerMapper.insert(ticker) > 0
                ? TickerResult.SUCCESS
                : TickerResult.FAILURE;
    }

    public TickerResult deleteTicker(String id) {
        if (id == null) {
            return TickerResult.FAILURE;
        }
        return this.tickerMapper.deleteById(id) > 0
                ? TickerResult.SUCCESS
                : TickerResult.FAILURE;
    }

    public TickerEntity[] getAll() {
        return this.tickerMapper.selectAll();
    }
}
