export const invoice = {
    customer: "BigCo",
    performances: [
        {
            "playID": "hamlet",
            "audience": 55
        },
        {
            "playID": "as-like",
            "audience": 35
        },
        {
            "playID": "othello",
            "audience": 40
        }
    ]
}

export const plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
}
// 剧团则根据观众（audience）人数及剧目类型来向客户收费。
// 该团目前出演两种戏剧：悲剧（tragedy）和喜剧（comedy）。
// 给客户发出账单时，剧团还会根据到场观众的数量给出“观众量积分”（volumeCredit）优惠，下次客户再请剧团表演时可以使用积分获得折扣
export function statement(invoice, plays) {
    let totalAmount = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }

    result += `Amount owed is ${usd(totalAmount)}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;

}
// console.log( statement(invoice, plays))

// 需求修改：
// 首先，PM希望以HTML格式输出详单
// 然后添加演出戏剧类型，对戏剧场次的计费方式、积分的计算方式都有影响
// 需求的变化使重构变得必要，如果一段代码能正常工作，并且不会再被修改，那么完全可以不去重构它。能改进它当然很好


function amountFor(perf){
    let result = 0;
    switch (playFor(perf).type) {
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
function playFor(aPerformance){
    return plays[aPerformance.playID];
}
function volumeCreditsFor(perf){
    let volumeCredits = 0;
    volumeCredits += Math.max(perf.audience - 30, 0);
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
    return volumeCredits;
}
// 好的命名十分重要，但往往并非唾手可得。
// 只有恰如其分地命名，才能彰显出将大函数分解成小函数的价值。
// 用当前想到最好的，如果过段时间想到更好的了那就替换掉
function usd(number){
    return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(number/100);
}
// 对于重构过程的性能问题，大多数情况下可以忽略它。如果重构引入了性能损耗，先完成重构，再做性能优化。
function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
        volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
}











export function add(...args) {
  return args.reduce((a, b) => a + b, 0)
}


export function sampleProvinceData() {
    return {
        name: "Asia",
        producers: [
            {name: "Byzantium", cost: 10, production: 9},
            {name: "Attalia", cost: 12, production: 10},
            {name: "Sinope", cost: 10, production: 6},
        ],
        demand: 30,
        price: 20
    };
}
// 一旦业务逻辑的部分开始变复杂，应该把它与UI分离开，以便能更好地理解和测试它。
export class Province {
    constructor(doc) {
        this._name = doc.name;
        this._producers = [];
        this._totalProduction = 0;
        this._demand = doc.demand;
        this._price = doc.price;
        doc.producers.forEach(d => this.addProducer(new Producer(this, d)));
    }
    addProducer(arg) {
        this._producers.push(arg);
        this._totalProduction += arg.production;
    }
    get name() {return this._name;}
    get producers() {return this._producers.slice();}
    get totalProduction() {return this._totalProduction;}
    set totalProduction(arg) {this._totalProduction = arg;}
    get demand() {return this._demand;}
    set demand(arg) {this._demand = parseInt(arg);}
    get price() {return this._price;}
    set price(arg) {this._price = parseInt(arg);}
    get shortfall() {
      return this._demand - this.totalProduction;
    }
    get profit() {
        return this.demandValue - this.demandCost;
    }
    get demandCost() {
        let remainingDemand = this.demand;
        let result = 0;
        this.producers
        .sort((a,b) => a.cost - b.cost)
        .forEach(p => {
            const contribution = Math.min(remainingDemand, p.production);
            remainingDemand -= contribution;
            result += contribution * p.cost;
        });
        return result;
    }
    get demandValue() {
        return this.satisfiedDemand * this.price;
    }
    get satisfiedDemand() {
        return Math.min(this._demand, this.totalProduction);
    }

}

export class Producer {
    constructor(aProvince, data) {
        this._province = aProvince;
        this._cost = data.cost;
        this._name = data.name;
        this._production = data.production || 0;
    }
    get name() {return this._name;}
    get cost() {return this._cost;}
    set cost(arg) {this._cost = parseInt(arg);}
    get production() {return this._production;}
    set production(amountStr) {
        const amount = parseInt(amountStr);
        const newProduction = Number.isNaN(amount) ? 0 : amount;
        this._province.totalProduction += newProduction - this._production;
        this._production = newProduction;
    }
}