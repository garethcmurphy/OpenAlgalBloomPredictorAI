# GitHub Copilot Instructions

## Project Overview

**OpenAlgalBloomPredictorAI** is a Python-based machine learning application that predicts algal blooms using water quality and environmental data. It uses a Random Forest classifier trained on features such as temperature, pH, dissolved oxygen, turbidity, phosphorus, nitrogen, and rainfall.

## Architecture

- **`src/algal_bloom_predictor.py`** — Core `AlgalBloomPredictor` class: data generation, preprocessing, model training, evaluation, and prediction.
- **`app.py`** — Streamlit web application for interactive predictions.
- **`src/components/`** — Reusable UI components for the Streamlit app.
- **`src/assets/`** — Static assets (images, styles).
- **`tests/`** — pytest test suite.
- **`data/`** — CSV datasets (e.g. `algalbloom.csv`).

## Tech Stack

- **Python 3.13**
- **scikit-learn** — RandomForestClassifier for bloom prediction
- **pandas / numpy** — Data manipulation
- **seaborn / matplotlib** — Visualizations
- **Streamlit** — Web UI
- **Poetry** — Dependency management
- **pytest** — Testing
- **flake8 / ruff / pylint / black** — Linting and formatting

## Coding Conventions

- Follow PEP 8 style guidelines.
- Use **black** for code formatting (`black .`).
- Use **ruff** for fast linting (`ruff check .`).
- Use type hints where practical.
- Write docstrings for all public classes and methods (Google style).
- Keep functions small and focused on a single responsibility.
- Prefer `pd.DataFrame` operations over raw loops for performance.

## Testing

- Tests live in the `tests/` directory and are run with `pytest`.
- Always add tests for new functionality.
- Run tests with: `pytest`
- Run linting with: `flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics`

## Dependency Management

- Use **Poetry** to add or update dependencies: `poetry add <package>`.
- Keep `requirements.txt` in sync for environments that don't use Poetry.
- Do not pin overly strict versions; use `^` (caret) constraints in `pyproject.toml`.

## Data

- Synthetic data can be generated via `AlgalBloomPredictor.generate_synthetic_data()`.
- Real datasets should be placed in the `data/` directory as CSV files.
- The target column in datasets is `bloom` (binary: 0 = no bloom, 1 = bloom).

## Pull Requests

- Keep PRs small and focused.
- Include a clear description of what changed and why.
- Ensure CI passes (lint + tests) before requesting review.
- Reference relevant issues in the PR description.
