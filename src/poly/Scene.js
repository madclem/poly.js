import Container from './Container';

export default class Scene extends Container
{
    constructor()
    {
        super();
    }

    render(child)
    {
        if(!child) child = this;

        for (var i = 0; i < child._children.length; i++) {
            this._children[i].render();
        }
    }
}
