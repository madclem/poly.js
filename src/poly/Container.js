export default class Container
{
    constructor()
    {
        this._children = [];
    }

    addChild(child)
    {
        child._parent = this;
        this._children.addChild(child);
    }
}
