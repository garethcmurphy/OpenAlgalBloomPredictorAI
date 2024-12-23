"""This module contains the WildlifeComponent class,
 which is responsible for displaying information about
   the wildlife of Furesø Lake."""
import streamlit as st

class WildlifeComponent:
    """This module contains the WildlifeComponent class,
 which is responsible for displaying information about
   the wildlife of Furesø Lake."""
    def display(self, language):
        """Display the wildlife of Furesø Lake based on the selected language."""
        if language == "Danish":
            st.write("Dyrelivet i Furesø")
        else:
            st.write("Wildlife of Furesø")
        st.image("src/assets/images/placeholder_wildlife_image.jpg", width=500)
        st.write("**Placeholder for wildlife descriptions**")
        st.write(
            """This section will showcase the diverse wildlife found in Furesø
            Lake, including fish, birds, and mammals."""
        )
        st.dataframe(
            {
                "Species": ["Pike", "Cormorant", "Otter"],
                "Description": [
                    "Pike is a common fish species in Furesø Lake.",
                    "Cormorants are often seen diving for fish in the lake.",
                    "Otters are occasionally spotted near the shores of the lake.",
                ],
            }
        )
        st.write(
            """**Planteædere alger (Poisonous Algae):**
            (Brief description and link to a detailed resource)"""
        )
        