import inspect
from typing import Any, Callable, ParamSpec

import flask

P = ParamSpec("P")


class FlaskCity:
    def __init__(
        self,
        app: flask.Flask,
        deps: Any,
        ctx: dict[str, Any] | None = None,
    ):
        self.app = app
        self.deps = deps
        self.ctx = ctx or {}

    def template(
        self,
        path,
        render_func: Callable[[P], str],
        ctx: dict[str, Any] | None = None,
        ignore_global_ctx: bool = False,
    ):
        ctx = ctx or {}

        def render(*args, **kwargs):
            ctx_ = self._resolve_ctx(ctx, ignore_global_ctx)
            self.app.jinja_env.globals.update(ctx_)

            return render_func(*args, **kwargs)

        render.__name__ = f"render_{path}"

        self.app.add_url_rule(path, view_func=render, methods=["GET"])

    def _resolve_ctx(
        self,
        ctx: dict,
        ignore_global_ctx: bool,
    ):
        ctx_ = {}
        if not ignore_global_ctx:
            ctx_.update(self.ctx)
        ctx_.update(ctx)

        if ctx_:
            for key, value in ctx_.items():
                if callable(value):
                    params = inspect.signature(value).parameters
                    params = {param: self._resolve_dep(param) for param in params.keys()}
                    ctx_[key] = value(**params)
                else:
                    ctx_[key] = value

        return ctx_

    def _resolve_dep(self, param: str):
        return getattr(self.deps, param)
