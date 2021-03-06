//-------------------------------------------------------------------------
//BIBLIOTECA DE VECTORES ENCONTRADA EN INTERNET CON FUNCIONES Y FÓRMULAS---
//-------------------------------------------------------------------------

/**
 * @author zz85
 */

Vector2 = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Vector2.prototype = {

    constructor: Vector2,

    set: function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    },

    copy: function (v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    },

    clone: function () {
        return new Vector2(this.x, this.y);
    },


    add: function (v1, v2) {
        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;
        return this;
    },

    addSelf: function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    },

    sub: function (v1, v2) {
        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;
        return this;
    },

    subSelf: function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    },

    multiplyScalar: function (s) {
        this.x *= s;
        this.y *= s;
        return this;
    },

    divideScalar: function (s) {
        if (s) {
            this.x /= s;
            this.y /= s;
        } else {
            this.set(0, 0);
        }
        return this;
    },


    negate: function () {
        return this.multiplyScalar(-1);
    },

    dot: function (v) {
        return this.x * v.x + this.y * v.y;
    },

    lengthSq: function () {
        return this.x * this.x + this.y * this.y;
    },

    length: function () {
        return Math.sqrt(this.lengthSq());
    },

    //Normaliza el vector
    normalize: function () {
        return this.divideScalar(this.length());
    },

    distanceTo: function (v) {
        return Math.sqrt(this.distanceToSquared(v));
    },

    distanceToSquared: function (v) {
        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    },

    setLength: function (l) {
        return this.normalize().multiplyScalar(l);
    },

    equals: function (v) {
        return ((v.x === this.x) && (v.y === this.y));
    },

    //Gira el vector alrededor del origen en el ángulo especificado (en grados)
    //Equivale a multiplicar por la matriz de rotación 2×2.
    rotate: function (angle) {
        var x = this.x,
            y = this.y,
            to_radians = Math.PI / 180,
            rad = angle * to_radians,
            sin = Math.sin(rad),
            cos = Math.cos(rad),
            px = x * cos - y * sin;
        py = x * sin + y * cos;

        this.set(px, py);

        return this;

    },

    rotateAroundPivot: function (pivot, angle) {
        return this.subSelf(pivot).rotate(angle).addSelf(pivot);
    },

    //Devuelve el ángulo al que apunta el vector
    angle: function () {
        return Math.atan2(this.x, this.y);
    },

    flipLeft: function () {
        return this.set(this.x * -1, this.y);
    },

    flipRight: function () {
        return this.set(this.x, this.y * -1);
    },

};
