import streamlit as st

class HistoryComponent:
    def display(self, language):
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