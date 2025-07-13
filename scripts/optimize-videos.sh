#!/bin/bash

# Video optimization script for portfolio
# This script compresses videos to reduce file sizes by 60-80%

INPUT_DIR="public/videos"
OUTPUT_DIR="public/videos/optimized"
BACKUP_DIR="public/videos/backup"

# Create directories
mkdir -p "$OUTPUT_DIR"
mkdir -p "$BACKUP_DIR"

echo "🎬 Starting video optimization..."

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg is not installed. Please install it first:"
    echo "   macOS: brew install ffmpeg"
    echo "   Ubuntu: sudo apt install ffmpeg"
    exit 1
fi

# Function to optimize a single video
optimize_video() {
    local input="$1"
    local filename=$(basename "$input")
    local name="${filename%.*}"
    local backup="$BACKUP_DIR/$filename"
    local output="$OUTPUT_DIR/${name}.mp4"
    
    echo "📹 Processing: $filename"
    
    # Backup original
    cp "$input" "$backup"
    
    # Optimize video
    ffmpeg -i "$input" \
        -c:v libx264 \
        -preset medium \
        -crf 28 \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" \
        -y "$output" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        local original_size=$(du -h "$input" | cut -f1)
        local new_size=$(du -h "$output" | cut -f1)
        echo "✅ $filename: $original_size → $new_size"
        
        # Replace original with optimized version
        mv "$output" "$input"
    else
        echo "❌ Failed to optimize $filename"
    fi
}

# Process all video files
for video in "$INPUT_DIR"/*.{mp4,mov,mkv,avi}; do
    if [ -f "$video" ]; then
        optimize_video "$video"
    fi
done

# Clean up
rmdir "$OUTPUT_DIR" 2>/dev/null

echo "🎉 Video optimization complete!"
echo "📁 Original files backed up to: $BACKUP_DIR"
echo "💡 You can delete the backup folder once you've tested the optimized videos"