


function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 10; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

export default function Arrow(ctx) {

  console.log('ctx', ctx)
  ctx.beginPath();
  canvas_arrow(ctx, 10, 30, 200, 150);
  canvas_arrow(ctx, 100, 200, 400, 50);
  canvas_arrow(ctx, 200, 30, 10, 150);
  canvas_arrow(ctx, 400, 200, 100, 50);
  ctx.stroke();
}