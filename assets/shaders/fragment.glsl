uniform sampler2D texture;
uniform vec4 resolution;

varying vec2 vUv;

void main() {
  vec2 newUv = ((vUv - vec2(1.0))*resolution.zw +vec2(1.0));

  vec3 tex = texture2D(texture, newUv).xyz;
  gl_FragColor = vec4(tex,1);
}