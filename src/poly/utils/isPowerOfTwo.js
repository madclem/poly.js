let isPowerOfTwo = (value)=>
{

	if(!(value & (value - 1)))
	{
		return true;
	}

	return false;
	// return !!(value & (value - 1) == 0);
}

export default isPowerOfTwo;