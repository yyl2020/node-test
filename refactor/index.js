import createStatementData from "./createStatementData";

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
    return renderPlainText(createStatementData(invoice, plays))
}
function renderPlainText(data, plays){
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;
}

function htmlStatement(invoice, plays){
    return renderHtml(createStatementData(invoice, plays));
}
function renderHtml(data){
    let result = `<h1>Statement for ${data.customer}</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
    for (let perf of data.performances) {
    result += ` <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
    }
    result += "</table>\n";
    result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
    return result;
}
// console.log( statement(invoice, plays))
console.log( htmlStatement(invoice, plays))



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