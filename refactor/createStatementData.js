export default function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;
    function enrichPerformance(aPerformance) {
        aPerformance.play = playFor(aPerformance, plays);
        aPerformance.amount = amountFor(aPerformance);
        aPerformance.volumeCredits = volumeCreditsFor(aPerformance);
        return aPerformance;
    }
}

function amountFor(perf){
    let result = 0;
    switch (perf.play.type) {
        case "tragedy":
            result = 40000;
            if (perf.audience > 30) {
                result += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (perf.audience > 20) {
                result += 10000 + 500 * (perf.audience - 20);
            }
            result += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return result
}
function playFor(aPerformance, plays){
    return plays[aPerformance.playID];
}
function volumeCreditsFor(perf){
    let volumeCredits = 0;
    volumeCredits += Math.max(perf.audience - 30, 0);
    if ("comedy" === perf.play.type) volumeCredits += Math.floor(perf.audience / 5);
    return volumeCredits;
}

// 对于重构过程的性能问题，大多数情况下可以忽略它。如果重构引入了性能损耗，先完成重构，再做性能优化。
export function totalVolumeCredits(data) {
    let result = 0;
    for (let perf of data.performances) {
        result += perf.volumeCredits
    }
    return result;
}
export function totalAmount(data) {
    let result = 0;
    for (let perf of data.performances) {
        result += perf.amount
    }
    return result;
}