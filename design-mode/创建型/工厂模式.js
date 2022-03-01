// 工厂模式提供了一种创建对象的方法，对使用方隐藏了对象的具体实现细节，并使用一个公共的接口来创建对象。

class Luban {
    constructor() {
        this.name = "鲁班";
    }
}

class Yase {
    constructor() {
        this.name = "亚瑟";
    }
}

function Factory(type) {
    if (type === '鲁班') {
        return new Luban();
    } else if (type === '亚瑟') {
        return new Yase();
    }
}

let luban = Factory("鲁班");
console.log(luban);




