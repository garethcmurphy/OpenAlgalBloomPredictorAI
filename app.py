import numpy as np
import pandas as pd
import streamlit as st

# Language selection flag (initialize as English)
selected_language = "English"


# Function to display content based on language
def display_content(key, danish_text, english_text):
    if selected_language == "Danish":
        st.write(danish_text)
    else:
        st.write(english_text)


# Title and subtitle
eng = "Explore Furesø - Wildlife, History, and More"
dk = "Udforsk Furesø - Dyreliv, Historie og Mere"
st.title(f"""{eng if selected_language == 'English' else dk}""")

x = 1

# Sidebar for language and navigation
with st.sidebar:
    selected_language = st.selectbox("Sprog/Language", ("Danish", "English"))
    navigation = st.radio(
        "Navigate to:", ("Map", "Wildlife", "History", "Guides", "Useful Info")
    )

# Display content based on navigation selection
if navigation == "Map":
    # Placeholder for map using streamlit-elements
    #  and Leaflet (replace with actual code)
    st.write("**Map Placeholder**")
    st.markdown(
        """This section will display an interactive map of Furesø Lake using
  streamlit-elements and Leaflet. It will include zoom controls, geolocation
  (optional), and points of interest (POIs) with popups for details.
  """
    )
    # Create a base map centered on a certain location (adjust as needed)

    # Display the map with markers
    df = pd.DataFrame(
        np.random.randn(45, 2) / [50, 50] + [55.7944, 12.3562], columns=["lat", "lon"]
    )

    st.map(df)

elif navigation == "Wildlife":
    display_content(x, "Dyrelivet i Furesø", "Wildlife of Furesø")
    # Placeholder for wildlife images and text (replace with actual content)
    st.image("placeholder_wildlife_image.jpg", width=500)
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
elif navigation == "History":
    display_content(x, "Furesøs Historie", "History of Furesø")
    # Placeholder for historical text and images (replace with actual content)
    st.write("**Placeholder for historical text**")
    st.image("placeholder_historical_image.jpg", width=500)
    st.write(
        """This section will outline the historical significance of
          Furesø Lake, including geological formation, human settlements,
            and cultural aspects."""
    )
elif navigation == "Guides":
    display_content(x, "Guide til Furesø", "Guides for Furesø")
    # Placeholder for guide information (replace with actual content)
    st.write("**Placeholder for guide information**")
    st.write(
        """This section will provide resources and information for visitors,
          including hiking/biking trails, birdwatching tips,
            fishing regulations, and links to local guides."""
    )
elif navigation == "Useful Info":
    display_content(x, "Nyttige Informationer", "Useful Information")
    # Placeholder for useful information (replace with actual content)
    st.write("**Placeholder for useful information**")
    st.write(
        """This section will provide practical details for visitors,
          including transportation, parking, accessibility, amenities,
            and emergency contacts."""
    )

# Display a note about placeholders
st.write(
    """**Note:** This is a mockup with placeholders. Replace them with
      actual content, images, and functionalities."""
)
