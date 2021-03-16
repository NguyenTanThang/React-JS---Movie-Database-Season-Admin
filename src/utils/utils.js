export const exchangeURLToFileDirectory = (url) => {
    var uri = url;
    var enc = encodeURI(uri);
    var dec = decodeURI(enc);
    var tempUrl = dec.replace(/%20/g, " ");
    tempUrl = tempUrl.replace(/%2F/g, "/");
    tempUrl = tempUrl.replace(/%23/g, "#");
    tempUrl = tempUrl.split("?")[0].split("/o/")[1];
    return tempUrl;
}

export const checkIfIn = (key, arr) => {
    key = String(key);
    console.log(key);
    return arr.includes(key);
}

export const capitalizeText = (text) => {
    return text.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

export const convertKeyToText = (key) => {
    return capitalizeText(key.replace(/_/g, ' '));
}

export const filterEpisodes = (episodes, totalEpisode) => {
    return episodes = episodes.filter(episode => {
        const {episodeNum} = episode;
        if (episodeNum > totalEpisode) {
            return false;
        }
        return true
    })
}

export const paginate = (
    totalItems,
    currentPage = 1,
    pageSize = 8,
    maxPages = 5
) => {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage, endPage;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}

export const isEpisodeNumOccurred = (episodes, episodeNum) => {
    let ans = false;
    episodes.forEach(episode => {
        if (
            episode.episodeNum == episodeNum
        ) {
            ans = true;
        }
    })
    return ans;
}

export const getFileExtension = (filename) => {
    return filename.split('.').pop();
}

export function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return {
        bgColor: 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.4 + ')',
        borderColor: 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')'
    }
}

export const calculatePercentage = (num, total) => {
    return Math.round((num / total) * 100);
}

export const filterRevenue = (data) => {
    var keys = Object.keys(data);
    let labels = "";
    let datasets = [];

    for (let i = 0; i < keys.length; i++) {
        let dataset = {};
        let sum = 0;
  
        dataset = {
            label: "Monthly Revenue",
            data: [],
            backgroundColor: 'rgba(67, 50, 133, 0.4)',
            borderColor: 'rgba(67, 50, 133, 1)',
            borderWidth: 1,
            labels: ""
        }

        const key = keys[i];
        const yearlyRevenue = data[key];
        console.log(yearlyRevenue);
        const yearlyRevenueKeys = Object.keys(yearlyRevenue);
        labels = yearlyRevenueKeys;
        let isGood = false;
        
        for (let j = 0; j < yearlyRevenueKeys.length; j++) {
            const yearlyRevenueKey = yearlyRevenueKeys[j];
            const yearlyRevenueMonthItem = yearlyRevenue[yearlyRevenueKey];
            console.log(yearlyRevenueMonthItem);
            const {totalRevenue} = yearlyRevenueMonthItem;
            if (totalRevenue > 0) {
                isGood = true;
                sum += totalRevenue;
                dataset.data = [...dataset.data, totalRevenue];
                dataset.labels = labels;
            }
        }

        if (isGood) {
            dataset.total = sum;
            datasets.push(dataset);
        }
    }

    console.log(datasets);

    return datasets;
}

export const filterPercentageOfSubscribedUsers = (data) => {
    const {totalUser, subscribedUser} = data;

    let dataset = {};
    dataset = {
        label: ["Non-Subscribed Users", "Subscribed Users"],
        data: [calculatePercentage(totalUser - subscribedUser, totalUser), calculatePercentage(subscribedUser, totalUser)],
        backgroundColor: ['rgba(87, 23, 184, 0.4)', 'rgba(30, 185, 141, 0.4)'],
        borderColor: ['rgba(87, 23, 184, 1)', 'rgba(30, 185, 141, 1)'],
        borderWidth: 1
    }
        
    return dataset;
}