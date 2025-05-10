package lt.tomasc.yourhelper.dto;

import lt.tomasc.yourhelper.model.MainPage;
import lt.tomasc.yourhelper.model.MainPageImage;

import java.io.IOException;

public class MainPageMapper {

    public static MainPageResponse toDTO(MainPage page) {
        return new MainPageResponse(
                page.getId(),
                page.getTitle(),
                page.getSubtitle(),
                page.getPostCarouselDescription(),
                page.getCarouselHeading()
        );
    }

    public static MainPageImage toEntity(MainPageImageRequest request) throws IOException {
        try {
            MainPageImage img = new MainPageImage();
            img.setFileSize(request.mainPageImage().getSize());
            img.setFilename(request.mainPageImage().getOriginalFilename());
            img.setData(request.mainPageImage().getBytes());
            img.setContentType(request.mainPageImage().getContentType());
            return img;
        } catch (Exception e) {
            throw new IOException("Failed to convert request to entity");
        }
    }
}
