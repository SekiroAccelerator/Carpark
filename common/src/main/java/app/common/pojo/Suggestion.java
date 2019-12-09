package app.common.pojo;

import lombok.Data;

import java.util.Date;
@Data
public class Suggestion {
    private Integer id;

    private String consult;

    private String feedback;

    private Date cTime;

    private Date fTime;

    private Integer STATUS;

    private Integer uid;

    private Integer cid;
}