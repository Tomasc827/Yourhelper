package lt.tomasc.yourhelper.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class ImageFileValidator implements ConstraintValidator<ValidImage, MultipartFile> {
    private static final Long MAX_SIZE = 5 * 1024 * 1024L;
    private static final List<String> VALID_CONTENT_TYPES = List.of(
            "image/jpeg", "image/png", "image/webp"
    );

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file == null || file.isEmpty()) {
            return false;
        }
        if (file.getSize() > MAX_SIZE) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("File must not exceed 5mb")
                    .addConstraintViolation();
            return false;
        }
        if (!VALID_CONTENT_TYPES.contains(file.getContentType())) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("File must be one of " + VALID_CONTENT_TYPES)
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}
