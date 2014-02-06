from gevent import monkey
monkey.patch_all()

from os import chdir
from socketio import socketio_manage
from socketio.server import SocketIOServer
from socketio.namespace import BaseNamespace
from socketio.mixins import BroadcastMixin


class PointerNamespace(BaseNamespace, BroadcastMixin):
    def initialize(self):
        self.broadcast_event('init')

    def on_l(self, msg):
        self.broadcast_event('l', msg['l'])

    def on_r(self, msg):
        self.broadcast_event('r', msg['r'])

    def on_u(self, msg):
        self.broadcast_event('u', msg['u'])

    def on_d(self, msg):
        self.broadcast_event('d', msg['d'])

    def recv_disconnect(self):
        """Bye bye darling"""
        self.disconnect(silent=True)


class Application(object):
    def __init__(self):
        self.request = {}

    def __call__(self, environ, start_response):
        path = environ['PATH_INFO'].strip('/')

        if not path:
            start_response('200 OK', [('Content-Type', 'text/html')])
            return ['<h1>Welcome. ''Try the <a href="/index.html">guilbep</a> example.</h1>']

        if path.startswith('css/') or path.startswith('img/') or path.startswith('js/') or path.startswith('lib/') or path.startswith('partials/') or path == 'index.html':
            try:
                print path
                data = open(path).read()
            except Exception:
                return not_found(start_response)

            if path.endswith(".js"):
                content_type = "text/javascript"
            elif path.endswith(".css"):
                content_type = "text/css"
            elif path.endswith(".swf"):
                content_type = "application/x-shockwave-flash"
            else:
                content_type = "text/html"

            start_response('200 OK', [('Content-Type', content_type)])
            return [data]

        if path.startswith("socket.io"):
            socketio_manage(environ, {'/pointer': PointerNamespace}, self.request)
        else:
            return not_found(start_response)


def not_found(start_response):
    start_response('404 Not Found', [])
    return ['<h1>Not Found</h1>']


if __name__ == '__main__':
    chdir('app')
    print 'Listening on port 8080 and on port 843 (flash policy server)'
    SocketIOServer(
        ('0.0.0.0', 8080), Application(),
        resource="socket.io", policy_server=True,
        policy_listener=('0.0.0.0', 10843)
    ).serve_forever()
