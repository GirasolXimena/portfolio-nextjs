


function canvas_arrow(context, fromx, fromy, tox, toy, headlen = 50) {
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.lineWidth = 20
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  context.lineTo(tox, toy);
  context.closePath()
  context.fill()
}

export default function Arrow(ctx) {

  console.log('ctx', ctx)
  ctx.beginPath();
  canvas_arrow(ctx, 25, 75, 250, 75);
  ctx.stroke();
}