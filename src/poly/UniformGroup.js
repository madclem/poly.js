
export default class UniformGroup
{
    constructor(data, program)
    {
        for (var p in data) {
            this[p] = data[p];
        }

        this.__data = {};

        var self = this;

        for(var p in self) {
            if(p === '__data') {
                return;
            }

            self.__data[p] = self[p];

            (function(name) {
                Object.defineProperty (self, name, {
                    get: function () {
                        return self.__data[name].value;
                    },
                    set: function (value) {
                        self.__data[name].value = value;

                        let type = self.__data[name].type;
                        let glFunction = POLY.CONST.uniformTypes[type];

                        let gl = program.gl;
                        if(type.indexOf('mat') === -1)
                        {
                            if(type === 'texture')
                            {
                                gl[glFunction](program.getUniformLocation(name), value, self.__data[name].index);
                            }
                            else
                            {
                                gl[glFunction](program.getUniformLocation(name), value);
                            }
                        }
                        else
                        {
                            gl[glFunction](program.getUniformLocation(name), false, value);
                        }
                    }
                });
            })(p);
        }
    }
}
