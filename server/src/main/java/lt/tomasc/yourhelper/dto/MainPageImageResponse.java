package lt.tomasc.yourhelper.dto;

public record MainPageImageResponse(
        byte[] data,
        String contentType
) {
}
