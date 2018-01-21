export default class Vector
{
    constructor(cb)
    {
    	this.cb = cb;

        this._x = 0;
        this._y = 0;
        this._z = 0;

        return this;
    }

    get x()
    {
    	return this._x;
    }

    set x(value)
    {
    	this._x = value;
    	if(this.cb) this.cb();
    }

    get y()
    {
    	return this._y;
    }

    set y(value)
    {
    	this._y = value;
    	if(this.cb) this.cb();
    }

    get z()
    {
    	return this._z;
    }

    set z(value)
    {
    	this._z = value;
    	if(this.cb) this.cb();
    }

    set(x, y, z)
    {
    	if(!x) x = 0;

    	if(y === undefined)
    	{
    		y = z = x;
    	}

    	this._x = x;
    	this._y = y;
    	this._z = z;

    	if(this.cb) this.cb();
    }


}
