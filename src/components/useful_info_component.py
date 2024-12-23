"""Useful Information Component"""
import streamlit as st

class UsefulInfoComponent:
    """Component for displaying useful information for visitors."""
    def display(self, language):
        """Display useful information based on the selected language."""
        if language == "Danish":
            st.write("Nyttige Informationer")
        else:
            st.write("Useful Information")
        st.write("**Placeholder for useful information**")
        st.write(
            """This section will provide practical details for visitors,
            including transportation, parking, accessibility, amenities,
            and emergency contacts."""
        )