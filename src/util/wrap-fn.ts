export function wrap<T>( 
	t: () => T, 
	c: () => T 
): T {
	try { return t(); }
	catch( _ ) { return c(); }
}