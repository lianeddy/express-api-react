let obj = {
    nama : 'lian',
    nested : {
        nest : true
    }
};

let { nested } = obj;
let { nest } = nested;

console.log(nest)