<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="/static/favicon.ico">
  <title>{{title}}</title>
  <link rel="stylesheet" href="/{{fingerprint['global.css']`}}" media="all">
  {% if cssAsset %}
    <link rel="stylesheet" href="/{{cssAsset}}" media="all">
  {% endif %}
  {% block head %}
  {% endblock %}
</head>
<body>
  {% block body%}
  {% endblock %}
  <script src="/{{fingerprint['global.js']}}"></script>
  {% if jsAsset %}
    <script src="/{{jsAsset}}"></script>
  {% endif %}
  {% if env.development %}
    <script src="http://localhost:35729/livereload.js"></script>
  {% endif %}
</body>
</html>
