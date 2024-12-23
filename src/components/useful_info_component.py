import streamlit as st

class UsefulInfoComponent:
    def display(self, language):
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