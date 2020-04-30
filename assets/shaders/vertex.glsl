uniform float progress;
uniform float time;

varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 newpos = position;
    float dist = distance(vUv, vec2(0.5));
    float superProgree = min(2.*progress, 2.*(1.-progress));

    float zOffset = 2.;
    float zProgress = clamp(2. * progress, 0., 1.);

    newpos.z += zOffset*(dist * superProgree - zProgress);

    newpos.z += 0.1*(sin(dist*10. + time * 5.) * progress);

    gl_Position = projectionMatrix * modelViewMatrix * vec4( newpos, 1.0 );
}