---
title: Index
---

{% extends 'default.swig' %}

{% block body %}

<h1>
  {{data.title}}
</h1>

<ul>
  <li>
    <a href='/page-1'>
      Page 1
    </a>
  </li>
  <li>
    <a href='/page-2'>
      Page 2
    </a>
  </li>
<ul>

{% endblock %}
