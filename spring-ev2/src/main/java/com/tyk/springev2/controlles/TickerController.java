package com.tyk.springev2.controlles;

import com.tyk.springev2.Services.TickerService;
import com.tyk.springev2.entities.TickerEntity;
import com.tyk.springev2.results.ticker.TickerResult;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/ticker")
public class TickerController {
    private final TickerService tickerService;

    @Autowired
    public TickerController(TickerService tickerService) {
        this.tickerService = tickerService;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getTicker() {
        return "ticker/index";
    }

    @RequestMapping(value = "/", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String addTicker(@RequestParam(value = "id") String id,
                            @RequestParam(value = "name") String name) {
        TickerEntity ticker = new TickerEntity();
        ticker.setId(id);
        ticker.setName(name);
        TickerResult result = this.tickerService.addTicker(ticker);
        JSONObject response = new JSONObject();
        response.put("result", result.toString().toLowerCase());
        return response.toString();
    }

    @RequestMapping(value = "/", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteTicker(@RequestParam(value = "index") String id) {
        TickerResult result = this.tickerService.deleteTicker(id);
        JSONObject response = new JSONObject();
        response.put("result", result.toString().toLowerCase());
        return response.toString();
    }

    @RequestMapping(value = "/tickers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public TickerEntity[] getMemos() {
        return this.tickerService.getAll();
    }
}

