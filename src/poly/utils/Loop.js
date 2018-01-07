
export default new class Loop
{

	constructor()
	{
		this._loops = [];
		this._idLoop = 1;

		this._active = false;
	}

	add(func, scope)
	{
		let id = this._idLoop;
		this._loops.push({
			func,
			id,
			scope
		});

		if(!this._active)
		{
			window.requestAnimationFrame(this._update.bind(this));
			this.start();
		}


		return id;
	}

	clear()
	{
		this._loops = [];
		this.stop();
	}

	start()
	{
		this._active = true;
	}

	stop()
	{
		this._active = false;
	}

	_update()
	{
		if(this._active)
		{
			window.requestAnimationFrame(this._update.bind(this));

			if(this._loops.length > 0)
			{
				for (var i = 0; i < this._loops.length; i++) 
				{
					this._loops[i].func(this._loops[i]);
				}
			}
			else
			{
				this.stop();
			}
		}

	}
}