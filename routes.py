import json
import os
from flask import render_template, request, jsonify, redirect, url_for, session, flash
from app import app, db
from models import Product, User


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/games')
def games():
    return render_template('games.html')


@app.route('/shop')
def shop():
    return render_template('shop.html')


@app.route('/api/products')
def get_products():
    # Read products from JSON file (in production, you'd fetch from database)
    with open(os.path.join(app.static_folder, 'data', 'products.json'), 'r') as file:
        products = json.load(file)
    return jsonify(products)


# Error Handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template('base.html', error="Page not found"), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('base.html', error="An internal error occurred"), 500
