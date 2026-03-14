<?php
/**
 * Dynamic OG Image Generator for CodeHelper
 *
 * Usage: og-image.php?title=Your+Page+Title&type=article
 *
 * Generates a 1200x630 PNG with:
 * - Background image
 * - CodeHelper logo (centered, top area)
 * - Title text (centered, below logo)
 * - Optional type badge
 */

// --- Configuration ---
$bgPath    = __DIR__ . '/images/background_og.png';
$logoPath  = __DIR__ . '/images/og_logo_300_300.png';
$fontPath  = __DIR__ . '/fonts/Inter-Bold.ttf';
$fallback  = '/images/codehelper_OGIMAGE.webp';

// --- Parameters ---
$title = isset($_GET['title']) ? trim($_GET['title']) : '';
$type  = isset($_GET['type'])  ? trim($_GET['type'])  : '';

// --- Validation & fallback ---
if (empty($title) || !function_exists('imagecreatefrompng') || !file_exists($bgPath) || !file_exists($fontPath)) {
    header('Location: ' . $fallback);
    exit;
}

// Sanitize title (max 120 chars)
$title = mb_substr(strip_tags($title), 0, 120, 'UTF-8');

// --- Create image from background ---
$image = imagecreatefrompng($bgPath);
if (!$image) {
    header('Location: ' . $fallback);
    exit;
}

$width  = imagesx($image);
$height = imagesy($image);
imagealphablending($image, true);

// --- Load and position logo (centered, top) ---
$logoBottomY = 80; // default if no logo
if (file_exists($logoPath)) {
    $logo = imagecreatefrompng($logoPath);
    if ($logo) {
        $logoW = imagesx($logo);
        $logoH = imagesy($logo);

        // Scale logo to 150px height
        $newLogoH = 150;
        $newLogoW = (int)($logoW * ($newLogoH / $logoH));

        $logoResized = imagecreatetruecolor($newLogoW, $newLogoH);
        imagealphablending($logoResized, false);
        imagesavealpha($logoResized, true);
        $transparent = imagecolorallocatealpha($logoResized, 0, 0, 0, 127);
        imagefill($logoResized, 0, 0, $transparent);
        imagealphablending($logoResized, true);
        imagecopyresampled($logoResized, $logo, 0, 0, 0, 0, $newLogoW, $newLogoH, $logoW, $logoH);

        // Center horizontally, 50px from top
        $logoX = (int)(($width - $newLogoW) / 2);
        $logoY = 50;
        imagecopy($image, $logoResized, $logoX, $logoY, 0, 0, $newLogoW, $newLogoH);

        $logoBottomY = $logoY + $newLogoH + 30;

        imagedestroy($logo);
        imagedestroy($logoResized);
    }
}

// --- Type badge (if provided) ---
if (!empty($type)) {
    $badgeFontSize = 18;
    $typeLabel = ucfirst($type);
    $badgeBbox = imagettfbbox($badgeFontSize, 0, $fontPath, $typeLabel);
    $badgeW = abs($badgeBbox[2] - $badgeBbox[0]) + 40;
    $badgeH = abs($badgeBbox[7] - $badgeBbox[1]) + 16;
    $badgeX = (int)(($width - $badgeW) / 2);
    $badgeY = $logoBottomY;

    // Semi-transparent white badge background
    $badgeBg = imagecolorallocatealpha($image, 255, 255, 255, 100);
    imagefilledroundedrectangle($image, $badgeX, $badgeY, $badgeX + $badgeW, $badgeY + $badgeH, 8, $badgeBg);

    // Badge text
    $badgeTextColor = imagecolorallocate($image, 255, 255, 255);
    $badgeTextX = $badgeX + 20;
    $badgeTextY = $badgeY + $badgeH - 10;
    imagettftext($image, $badgeFontSize, 0, $badgeTextX, $badgeTextY, $badgeTextColor, $fontPath, $typeLabel);

    $logoBottomY = $badgeY + $badgeH + 20;
}

// --- Title text (white, centered, word-wrapped) ---
$white    = imagecolorallocate($image, 255, 255, 255);
$fontSize = 44;
$maxWidth = $width - 160; // 80px padding each side

// Reduce font size for very long titles
if (mb_strlen($title) > 60) {
    $fontSize = 38;
} elseif (mb_strlen($title) > 80) {
    $fontSize = 32;
}

// Word wrap
$words = explode(' ', $title);
$lines = [];
$currentLine = '';

foreach ($words as $word) {
    $testLine = $currentLine ? $currentLine . ' ' . $word : $word;
    $bbox = imagettfbbox($fontSize, 0, $fontPath, $testLine);
    $lineWidth = abs($bbox[2] - $bbox[0]);
    if ($lineWidth > $maxWidth && $currentLine !== '') {
        $lines[] = $currentLine;
        $currentLine = $word;
    } else {
        $currentLine = $testLine;
    }
}
if ($currentLine !== '') {
    $lines[] = $currentLine;
}

// Limit to 4 lines max
if (count($lines) > 4) {
    $lines = array_slice($lines, 0, 4);
    $lines[3] = mb_substr($lines[3], 0, -3) . '...';
}

// Center the text block vertically in the remaining space
$lineHeight = (int)($fontSize * 1.5);
$textBlockHeight = count($lines) * $lineHeight;
$availableHeight = $height - $logoBottomY - 40; // 40px bottom padding
$startY = $logoBottomY + (int)(($availableHeight - $textBlockHeight) / 2) + $fontSize;

foreach ($lines as $i => $line) {
    $bbox = imagettfbbox($fontSize, 0, $fontPath, $line);
    $lineWidth = abs($bbox[2] - $bbox[0]);
    $x = (int)(($width - $lineWidth) / 2);
    $y = $startY + ($i * $lineHeight);
    imagettftext($image, $fontSize, 0, $x, $y, $white, $fontPath, $line);
}

// --- Output ---
header('Content-Type: image/png');
header('Cache-Control: public, max-age=604800'); // Cache 7 days
imagepng($image, null, 6);
imagedestroy($image);

/**
 * Helper: filled rounded rectangle (for PHP < 8.1 compatibility)
 */
function imagefilledroundedrectangle($image, $x1, $y1, $x2, $y2, $radius, $color) {
    imagefilledrectangle($image, $x1 + $radius, $y1, $x2 - $radius, $y2, $color);
    imagefilledrectangle($image, $x1, $y1 + $radius, $x2, $y2 - $radius, $color);
    imagefilledellipse($image, $x1 + $radius, $y1 + $radius, $radius * 2, $radius * 2, $color);
    imagefilledellipse($image, $x2 - $radius, $y1 + $radius, $radius * 2, $radius * 2, $color);
    imagefilledellipse($image, $x1 + $radius, $y2 - $radius, $radius * 2, $radius * 2, $color);
    imagefilledellipse($image, $x2 - $radius, $y2 - $radius, $radius * 2, $radius * 2, $color);
}
