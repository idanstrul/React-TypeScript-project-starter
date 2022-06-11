// An exemple for a service that is responsible for 
// making AJAX calls for external API's.

import axios from "axios";
import { syncStorageService } from "./sync-storage.service";

export const bitcoinService = {
    getRate,
    getAvgBlockSizeData,
    getMarketPriceData,
    getTradeVolumeData
}

const STORAGE_KEY = 'btcData'

var cache = syncStorageService.loadFromSession(STORAGE_KEY) || {}



async function getRate() {
    try {
        if (cache.btcRate) {
            console.log('Getting getRate() from CACHE!');
            return cache.btcRate
        }
        console.log('Getting getRate() from SERVER!');
        var res = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
        cache.btcRate = res.data
        syncStorageService.storeToSession(STORAGE_KEY, cache)
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getMarketPriceData() {
    try {
        if (cache.marketPriceData) {
            console.log('Getting getMarketPriceData() from CACHE!');
            return cache.marketPriceData
        }
        console.log('Getting getMarketPriceData() from SERVER!');
        var res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
        cache.marketPriceData = res.data
        syncStorageService.storeToSession(STORAGE_KEY, cache)
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getAvgBlockSizeData() {
    try {
        if (cache.avgBlockSizeData) {
            console.log('Getting getAvgBlockSizeData() from CACHE!');
            return cache.avgBlockSizeData
        }
        console.log('Getting getAvgBlockSizeData() from SERVER!');
        var res = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
        cache.avgBlockSizeData = res.data
        syncStorageService.storeToSession(STORAGE_KEY, cache)
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getTradeVolumeData() {
    try {
        if (cache.tradeVolumeData) {
            console.log('Getting getTradeVolumeData() from CACHE!');
            return cache.tradeVolumeData
        }
        console.log('Getting getTradeVolumeData() from SERVER!');
        var res = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
        cache.tradeVolumeData = res.data
        syncStorageService.storeToSession(STORAGE_KEY, cache)
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}