from rest_framework import serializers

class PredictionSerializer(serializers.Serializer):
    """Serializer for prediction input data"""
    # Add your feature fields here
    feature1 = serializers.FloatField(required=True)
    feature2 = serializers.FloatField(required=True)
    # Add more features as needed
    
    class Meta:
        fields = ['feature1', 'feature2']  # Update with your actual feature names

class ItemSerializer(serializers.Serializer):
    """Serializer for items"""
    id = serializers.IntegerField()
    name = serializers.CharField()
