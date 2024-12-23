"""history_component.py"""

import streamlit as st


class HistoryComponent:
    """Component for displaying the history of Furesø Lake."""

    def display(self, language):
        """Display the history of Furesø Lake based on the selected language."""
        if language == "Danish":
            st.write("Furesøs Historie")
        else:
            st.write("History of Furesø")
        st.write("**Placeholder for historical text**")
        st.image("src/assets/images/placeholder_historical_image.jpg", width=500)
        st.write(
            """This section will outline the historical significance of
            Furesø Lake, including geological formation, human settlements,
            and cultural aspects."""
        )
