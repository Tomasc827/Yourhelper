package lt.tomasc.yourhelper.dto;

import lt.tomasc.yourhelper.validation.ValidImage;
import org.springframework.web.multipart.MultipartFile;

public record MainPageImageRequest(@ValidImage MultipartFile mainPageImage) {
}
