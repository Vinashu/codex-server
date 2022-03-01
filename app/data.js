const res = require("express/lib/response");

class Message {
    variable = "";
    value = 0;

    constructor (variable, value) {
        this.variable = variable;
        this.value = value;
    }
}

class Dispatcher {
    messages = [];

    constructor(messages) {
        this.messages = messages;
    }
}

class Target {
    name = "";
    variable = "";
    value = 0;
    operation = "";
    reward = 0;

    constructor(name, variable, value, operation, reward) {
        this.name = name;
        this.variable = variable;
        this.value = value;
        this.operation = operation;
        this.reward = reward;
    }
}

const targets = [
    new Target(
        "Target 1",
        "level",
        1,
        "==",
        1
    ),
    new Target(
        "Target 2",
        "levels",
        10,
        "==",
        2
    ),    
    new Target(
        "Target 3",
        "points",
        150,
        "==",
        3
    )
];

const messages = [
    new Message(
        "level",
        1
    ),
    new Message(
        "levels",
        10
    ),
    new Message(
        "points",
        150
    )
]

const dispatcher = new Dispatcher(messages);

class Engine {
    targets = [];
    rewards = [];

    constructor (targets, rewards) {
        this.targets = targets;
        this.rewards = rewards;
    }

    // checkTarget (message) {
    //     return this.targets.filter((target) => {
    //         if(target.variable = message.variable) {
    //             if (eval(message.value + target.operation + target.value)) {
    //                 return true;
    //             }
    //         }
    //     }) 
    // }
    checkTarget (messages) {
        let result = [];
        messages.forEach(message => {
            result = [...result, ...this.targets.filter(target => {
                return eval(message.value + target.operation + target.value);
            })];
        });
        return result;        
    }    

    // checkRewards(message) {
    //     let targets = this.checkTarget(message);
    //     let result = [];
    //     targets.forEach(target => {
    //         result = [...result, ...this.rewards.filter(reward => {
    //             return target.reward == reward._id;
    //         })];
    //     })
    //     return result;
    // }
    checkRewards(messages) {
        let targets = this.checkTarget(messages);
        let result = [];
        targets.forEach(target => {
            result = [...result, ...this.rewards.filter(reward => {
                return target.reward == reward._id;
            })];
        })
        return result;
    }
}

class Reward {
    _id = 0;
    category = "";
    name = "";
    description = "";
    imagePath = "";

    constructor(_id, category, name, imagePath, desc) {
        this._id = _id;
        this.category = category;
        this.name = name;
        this.imagePath = imagePath;
        this.description = desc;
    }
}

const rewards = [
    new Reward(
        1, 
        "Badge",
        "Badge 01", 
        "badge01.png", 
        "Completed the 1st level"
    ),
    new Reward( 
        2, 
        "Badge",
        "Badge 02", 
        "badge02.png", 
        "Completed 10 levels"
    ),
    new Reward(
        3, 
        "Badge", 
        "Badge 03",
        "badge03.png", 
        "Achieved the maximum score in one level"
    ),
];

const engine = new Engine(targets, rewards);
console.log(engine.checkRewards(dispatcher.messages));
