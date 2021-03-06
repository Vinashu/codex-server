///
/// Classes 
///

/// Class Message
/// It has a pair { variable, value } that is send to the server
/// and used to verify for possible targets and rewards
class Message {
    variable = "";
    value = 0;

    constructor (variable, value) {
        this.variable = variable;
        this.value = value;
    }
}

/// Class Dispatcher
/// It is an array of messages, as it is not possible to send an array, 
/// only JSON objects, so the Dispatcher class has just an array of messages
class Dispatcher {
    messages = [];

    constructor(messages) {
        this.messages = messages;
    }
}

/// Class Target
/// Has the rules to check what reward can be obtained, by checking
/// the variable and value that comes in messages
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

/// Class Reward
/// Collection of possible rewards
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

class Variable {
    name = "";

    constructor (name) {
        this.name = name;
    }
}

/// Class Engine
/// Class responsible to receive the messages, check the targets
/// and return an array of rewards
class Engine {
    targets = [];
    rewards = [];    
    variables = [];

    constructor (targets, rewards, variables) {
        this.targets = targets;
        this.rewards = rewards;
        this.variables = variables;
    }

    /// Check if the variables are valid
    checkVariables(messages) {
        let result = [];
        result = messages.filter(message => {
            return this.variables.some(variable => {
                return message.variable === variable.name;
            });
        });
        return result;
    }

    /// Check all the targets there are valid based on the messages received
    checkTarget (messages) {
        let result = [];
        result = this.targets.filter(target => {
            return messages.some(message => {
                return target.variable === message.variable && eval(message.value + target.operation + target.value);
            });
        });
        return result;        
    }    

    /// Check all the rewards available based on the messages received
    checkRewards(messages) {
        let checkVariables = this.checkVariables(messages);
        let targets = this.checkTarget(checkVariables);
        let result = [];
        result = this.rewards.filter(reward => {
            return targets.some(target => {
                return eval(reward._id === target.reward);
            });
        });
        return result;
    }
}

///
/// Objects
///

/// Variables
const variables = [
    new Variable("level"),
    new Variable("levels"),
    new Variable("points"),
    new Variable("allTimePoints"),
]

/// Rewards
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
        "Completed 5 levels"
    ),
    new Reward(
        3, 
        "Badge", 
        "Badge 03",
        "badge03.png", 
        "Achieved the maximum score in one level"
    ),
    new Reward(
        4, 
        "Badge", 
        "Badge 04",
        "badge04.jpeg", 
        "Completed 10 levels"
    ),    
];

/// Targets
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
        5,
        "==",
        2
    ),    
    new Target(
        "Target 3",
        "points",
        150,
        "==",
        3
    ),
    new Target(
        "Target 4",
        "levels",
        10,
        "==",
        4
    )    
];

/// Messages
/*
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
*/

/// Dispatcher
// const dispatcher = new Dispatcher(messages);
// console.log(engine.checkRewards(dispatcher.messages));

/// Engine, for testing purpose
const engine = new Engine(targets, rewards, variables);


module.exports = {engine, Message};