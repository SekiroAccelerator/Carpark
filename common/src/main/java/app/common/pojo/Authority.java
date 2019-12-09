package app.common.pojo;

import lombok.Data;

@Data
public class Authority {
    private int id;
    private String name;
    private String parentId;
}
