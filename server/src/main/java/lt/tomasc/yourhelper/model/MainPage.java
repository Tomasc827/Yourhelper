package lt.tomasc.yourhelper.model;

import jakarta.persistence.*;

@Entity
@Table(name = "main_page")
public class MainPage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String subtitle;
    private String carouselHeading;
    private String postCarouselDescription;

    public MainPage() {

    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getCarouselHeading() {
        return carouselHeading;
    }

    public void setCarouselHeading(String carouselHeading) {
        this.carouselHeading = carouselHeading;
    }

    public String getPostCarouselDescription() {
        return postCarouselDescription;
    }

    public void setPostCarouselDescription(String postCarouselDescription) {
        this.postCarouselDescription = postCarouselDescription;
    }
}
