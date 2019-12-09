package app.common.pojo;

import lombok.Data;

import java.util.Date;
@Data
public class Notice {
    private Integer id;

    private String title;

    private Integer scope;

    private Integer STATUS;

    private Date publishedTime;

    private String content;

    private String annex;

    private Integer uid;
}