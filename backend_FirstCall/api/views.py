import pickle
import os
import logging
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import PredictionSerializer, ItemSerializer

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Get the absolute path of the .pkl file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
PICKLE_FILE_PATH = os.path.join(DATA_DIR, "best_hospital_model.pkl")

# Create data directory if it doesn't exist
os.makedirs(DATA_DIR, exist_ok=True)

# Initialize variables
feature_names = None
model = None

# Load the .pkl file if it exists
if os.path.exists(PICKLE_FILE_PATH):
    try:
        with open(PICKLE_FILE_PATH, "rb") as file:
            feature_names = pickle.load(file)
            logger.info("Successfully loaded feature names from pickle file")
    except Exception as e:
        logger.error(f"Error loading pickle file: {str(e)}")
else:
    logger.warning(f"Pickle file not found at {PICKLE_FILE_PATH}")

@api_view(['GET'])
@permission_classes([AllowAny])
def get_feature_names(request):
    """API endpoint to return hospital feature names."""
    if feature_names is not None:
        return Response({"feature_names": feature_names.tolist()})
    return Response(
        {"error": "Feature names not available"}, 
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )

@api_view(['GET'])
@permission_classes([AllowAny])
def get_items(request):
    """API endpoint to return list of items."""
    items = [
        {"id": 1, "name": "Item 1"},
        {"id": 2, "name": "Item 2"},
        {"id": 3, "name": "Item 3"},
    ]
    serializer = ItemSerializer(items, many=True)
    return Response({"items": serializer.data})

@api_view(['GET'])
@permission_classes([AllowAny])
def api_home(request):
    """API home endpoint."""
    return Response({"message": "Welcome to the Hospital API"})

@api_view(['POST'])
@permission_classes([AllowAny])
def predict(request):
    """API endpoint for making predictions."""
    serializer = PredictionSerializer(data=request.data)
    if serializer.is_valid():
        # Add your prediction logic here
        # Example:
        # prediction = model.predict([list(serializer.validated_data.values())])
        return Response({
            "message": "Prediction endpoint",
            "received_data": serializer.validated_data
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
