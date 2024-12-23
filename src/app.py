"""Streamlit app for exploring Furesø Lake in Denmark."""

import streamlit as st
from components.map_component import MapComponent
from components.wildlife_component import WildlifeComponent
from components.history_component import HistoryComponent
from components.guides_component import GuidesComponent
from components.useful_info_component import UsefulInfoComponent


class FuresoeExplorerApp:
    """Streamlit app for exploring Furesø Lake in Denmark."""

    def __init__(self):
        self.selected_language = "English"
        self.navigation = "Map"
        self.components = {
            "Map": MapComponent(),
            "Wildlife": WildlifeComponent(),
            "History": HistoryComponent(),
            "Guides": GuidesComponent(),
            "Useful Info": UsefulInfoComponent(),
        }

    def display_content(self, key, danish_text, english_text):
        """Display content based on the selected language."""
        if self.selected_language == "Danish":
            st.write(danish_text)
        else:
            st.write(english_text)

    def run(self):
        """Run the Furesø Explorer app."""
        self.selected_language = st.sidebar.selectbox(
            "Sprog/Language", ("Danish", "English")
        )
        self.navigation = st.sidebar.radio(
            "Navigate to:",
            (
                "Map",
                "Wildlife",
                "History",
                "Guides",
                "Useful Info",
            ),
        )

        title_eng = "Explore Furesø - Wildlife, History, and More"
        title_dk = "Udforsk Furesø - Dyreliv, Historie og Mere"
        st.title(
            f"""{title_eng if self.selected_language == 'English' else title_dk}"""
        )

        self.components[self.navigation].display(self.selected_language)

        st.write(
            """**Note:** This is a mockup with placeholders.
              Replace them with actual content, images, and functionalities."""
        )


if __name__ == "__main__":
    app = FuresoeExplorerApp()
    app.run()
