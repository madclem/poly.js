export default 
{
	uniformTypes: 
	{
		float: 'uniform1f',
		vec2: 'uniform2fv',
		vec3: 'uniform3fv',
		vec4: 'uniform4fv',
		int: 'uniform1i',
		texture: 'uniform1i',
		mat3: 'uniformMatrix3fv',
		mat4: 'uniformMatrix4fv'
	},
	extensions:
	[
		'EXT_shader_texture_lod',
		'EXT_sRGB',
		'EXT_frag_depth',
		'OES_texture_float',
		'OES_texture_half_float',
		'OES_texture_float_linear',
		'OES_texture_half_float_linear',
		'OES_standard_derivatives',
		'WEBGL_depth_texture',
		'EXT_texture_filter_anisotropic',
		'ANGLE_instanced_arrays',
		'WEBGL_draw_buffers'
	]
}
